import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { ShippingRuleTableHeading } from "@/constant/tableHeading";
import { EcommerceAPI } from "@/service/ecommerce/EcommerceAPI";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { ShippingRuleForm } from "@/common/Form/EcommerceForm/Shipping";
import { locationAPI } from "@/service/location/loctionAPI";

export const ShippingRule = () => {
  const {
    city,
    country
  } = new locationAPI();
  const {
    shipping,
    createShipping,
    updateShipping,
    deleteShipping,
  } = new EcommerceAPI();
  const { data, isLoading, refetch } = useQuery(["shipping-rule"], shipping);
  const { data: cityData } = useQuery(["city"], city);
  const { data: countryData } = useQuery(["country"], country);
  const [currentShippingRuleId, setCurrentShippingRuleId] = useState(null);
  const [currentShippingRuleData, setCurrentShippingRuleData] = useState(null);
  const [cityLocationOptions, setCityLocationOptions] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  useEffect(() => {
    // const getCountryName = countryData?.countries?.map((i)=> ({
    //   name: i?.name,
    //   country_id: i?.id
    // }))
    const getLocation = cityData?.cities
    ?.map((i) => ({
      name: `${i?.name.toLowerCase()}-${i?.country_state?.name.toLowerCase()}`,
      value: i?.id,
    }))

    getLocation?.unshift({
      name: "All Cities",
      value: "1"
    });
    setCityLocationOptions(getLocation)
  }, [cityData, countryData?.countries])

  const { mutate: createShippingRuleMutate, isLoading: createShippingRuleLoading } =
    useMutation(createShipping, {
      onSuccess: (data, variables, context) => {
        setOpenCreatePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenCreatePopup(true);
        refetch();
        ToastifyFailed(data?.notification);
      },
    });

  const { mutate: updateShippingRuleMutate, isLoading: updateShippingRuleLoading } =
    useMutation(updateShipping, {
      onSuccess: (data, variables, context) => {
        setOpenUpdatePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenUpdatePopup(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const { mutate: DeleteShippingRuleMutate, isLoading: deleteShippingRuleLoading } =
    useMutation(deleteShipping, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.notification);
      },
    });

  const handleCreateShippingRule = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateShippingRule = (id) => {
    setCurrentShippingRuleId(id);
    const getCurrentCounrty = data?.shippings?.find((i) => i?.id === id);
    setCurrentShippingRuleData(getCurrentCounrty);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteShippingRule = (id) => {
    setCurrentShippingRuleId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteShippingRule = () => {
    DeleteShippingRuleMutate({ id: currentShippingRuleId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }



  console.log(cityLocationOptions, cityData, 'cityLocationOptions');

  return (
    <>
      <Breadcrumb currentPage={"Shipping Rule"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateShippingRule}
        />
      </div>
      <BaseTable
        tableHeadings={ShippingRuleTableHeading}
        onDelete={handleDeleteShippingRule}
        onUpdate={handleUpdateShippingRule}
        onShippingData={data}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateShippingRule}>
          <ShippingRuleForm
            onClose={handleCreateShippingRule}
            button="Add"
            onSave={createShippingRuleMutate}
            loading={createShippingRuleLoading}
            locationData={cityLocationOptions}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateShippingRule}>
          <ShippingRuleForm
            currentShippingRuleId={currentShippingRuleId}
            onClose={handleUpdateShippingRule}
            button="Update"
            data={currentShippingRuleData}
            onUpdate={updateShippingRuleMutate}
            loading={updateShippingRuleLoading}
            locationData={cityLocationOptions}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteShippingRule}>
          <DeleteItem
            onClose={handleDeleteShippingRule}
            onClick={handleOnDeleteShippingRule}
            loading={deleteShippingRuleLoading}
          />
        </Popup>
      )}
    </>
  );
};
