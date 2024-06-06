import { CategoriesTable } from "@/common/BaseTable/TableBody/Categories/CategoriesTable";
import { OrderTable } from "@/common/BaseTable/TableBody/OrderTable";
import { SubCategoriesTable } from "@/common/BaseTable/TableBody/Categories/SubCategoriesTable";
import { ChildCategoriesTable } from "@/common/BaseTable/TableBody/Categories/ChildCategoriesTable";
import { TableHeader } from "./TableHeader";
import { OrderShowTable } from "./TableBody/OrderTable/OrderShow";
import { MegaMenuCategoriesTable } from "./TableBody/Categories/MegaMenuCategoriesTable";
import { PopularCategoriesTable } from "./TableBody/Categories/PopularCategoriesTable";
import { FeaturedCategoriesTable } from "./TableBody/Categories/FeaturedCategoriesTable";
import { BrandsTable } from "./TableBody/Products/BrandsTable";
import { SpecKeyTable } from "./TableBody/Products/SpecKeyTable";
import { SellerProductTable } from "./TableBody/Products/SellerProductTable";
import { Product } from "./TableBody/Products/Product";
import { Country } from "./TableBody/Location/Country";
import { State } from "./TableBody/Location/State";
import { City } from "./TableBody/Location/City";
import { Inventory } from "./TableBody/Inventory";
import { StockHistory } from "./TableBody/StockHistory";
import { DeliveryMan } from "./TableBody/DeliveryMan/DeliveryMan";
import { RecevieAmount } from "./TableBody/DeliveryMan/RecevieAmount";
import { useRouter } from "next/router";
import { MegaMenuSubCategoriesTable } from "./TableBody/Categories/MegaMenuSubCategoriesTable";
import { Coupon } from "./TableBody/Ecommerce/Coupon";
import { Shipping } from "./TableBody/Ecommerce/Shipping";
import { WithDraw } from "./TableBody/DeliveryManWithdraw/WithDraw";
import { WithDrawMethod } from "./TableBody/DeliveryManWithdraw/WithDrawMethod";
import { PendingWithdraw } from "./TableBody/DeliveryManWithdraw/PendingWithdraw";
import { Review } from "./TableBody/DeliveryMan/Review";
import { PendingSellerWithdraw } from "./TableBody/WithdrawPayment/PendingSellerWithdraw";
import { SellerWithdraw } from "./TableBody/WithdrawPayment/SellerWithdraw";
import { PaymentWithdrawMethod } from "./TableBody/WithdrawPayment/PaymentWithdrawMethod";
import { ContactMessage } from "./TableBody/ContactMessage";
import { CustomerList } from "./TableBody/Users/CustomerList";
import { PendingCustomerList } from "./TableBody/Users/PendingCustomerList";
import { SellerList } from "./TableBody/Users/SellerList";
import { PendingSellerList } from "./TableBody/Users/PendingSellerList";
import { EmailTemplate } from "./TableBody/EmailConfig/EmailTemplate";
import { SmsTemplate } from "./TableBody/SmsConfig/SmsTemplate";
import { Sliders } from "./TableBody/ManageWebsite/Sliders";
import { Service } from "./TableBody/ManageWebsite/Service";
import { HomePageSessionTitle } from "./TableBody/ManageWebsite/HomePageSessionTitle";
import { MailTemplate } from "./TableBody/EmailConfig/EmailTemplate/mainTemplate";
// import ReactPaginate from "react-paginate";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const BaseTable = ({
  ref,
  tableHeadings,
  tableTitle,

  // tableDatas starts
  onTableData,
  onCategoriesData,
  onPopularCategoriesData,
  onfeaturedCategoryData,
  onBrandsData,
  onSellerProductData,
  onSpecKeyData,
  onInventoryData,
  onStockHistoryData,
  onDeliveryManData,
  onRecevieAmountData,
  onProductData,
  onCountryData,
  onStateData,
  onCityData,
  onSubCategoriesData,
  onChildCategoriesData,
  onMegaMenuCategoriesData,
  onShowOrder,
  onMegaMenuSubData,
  onCouponData,
  onShippingData,
  onPendingWithdrawData,
  onWithDrawData,
  onWithdrawMethodData,
  onReviewData,
  onPendingSellerData,
  onSellerWithdrawData,
  onWithdrawPaymentData,
  onContactMessageData,
  onCustomerListData,
  onPendingCustomerListData,
  onSellerListData,
  onPendingSellerListData,
  onEmailTemplateData,
  onSmsConfigData,
  onSliderData,
  onServiceData,
  onHomepageTitleData,
  onMailTemplateData,

  // tableDatas ends

  //  Table Depend Data starts
  getCountry,
  //  Table Depend Data ends

  //  tableActions starts
  onUpdate,
  onDelete,
  onSend,
  onNavigate,
  isShown = false,
  //  tableActions ends
}) => {
  let tableHeadingList = [];

  tableHeadings?.forEach((item, index) => {
    tableHeadingList.push(<TableHeader index={index} item={item} />);
  });

  const router = useRouter();

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <h5>{tableTitle}</h5>
            </div>
            <br />
            <div className="card-body px-0 pt-0 pb-2" ref={ref}>
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead className="text-sm">
                    <tr className="font-weight-bold">{tableHeadingList}</tr>
                  </thead>
                  <tbody>
                    {isShown && (
                      <OrderTable
                        ref={ref}
                        onTableData={onTableData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onNavigate={onNavigate}
                      />
                    )}
                    {onCategoriesData && (
                      <CategoriesTable
                        onCategories={onCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onSubCategoriesData && (
                      <SubCategoriesTable
                        onSubCategories={onSubCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onChildCategoriesData && (
                      <ChildCategoriesTable
                        onChildCategories={onChildCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onMegaMenuSubData && (
                      <MegaMenuSubCategoriesTable
                        onMegaMenuSubCategories={onMegaMenuSubData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onMegaMenuCategoriesData && (
                      <MegaMenuCategoriesTable
                        onMegaMenuCategories={onMegaMenuCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onPopularCategoriesData && (
                      <PopularCategoriesTable
                        onPopularCategoriesData={onPopularCategoriesData}
                        onDelete={onDelete}
                      />
                    )}
                    {onfeaturedCategoryData && (
                      <FeaturedCategoriesTable
                        onfeaturedCategoryData={onfeaturedCategoryData}
                        onDelete={onDelete}
                      />
                    )}
                    {onShowOrder && (
                      <OrderShowTable onShowOrder={onShowOrder} />
                    )}
                    {onBrandsData && (
                      <BrandsTable
                        onBrandsData={onBrandsData}
                        onUpdate={onUpdate}
                      />
                    )}
                    {onSpecKeyData && (
                      <SpecKeyTable
                        onSpecKeyData={onSpecKeyData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onSellerProductData && (
                      <SellerProductTable
                        onSellerProductData={onSellerProductData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onProductData && (
                      <Product
                        onProductData={onProductData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onCountryData && (
                      <Country
                        onCountryData={onCountryData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onStateData && (
                      <State
                        onStateData={onStateData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onCityData && (
                      <City
                        getCountry={getCountry}
                        onCityData={onCityData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onInventoryData && (
                      <Inventory onInventoryData={onInventoryData} />
                    )}
                    {onStockHistoryData && (
                      <StockHistory onStockHistoryData={onStockHistoryData} />
                    )}

                    {onDeliveryManData && (
                      <DeliveryMan
                        onDeliveryManData={onDeliveryManData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onRecevieAmountData && (
                      <RecevieAmount
                        onRecevieAmountData={onRecevieAmountData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onCouponData && (
                      <Coupon
                        onCouponData={onCouponData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onShippingData && (
                      <Shipping
                        onShippingData={onShippingData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onWithDrawData && (
                      <WithDraw
                        onWithDrawData={onWithDrawData}
                        onDelete={onDelete}
                      />
                    )}
                    {onWithdrawMethodData && (
                      <WithDrawMethod
                        onWithdrawMethodData={onWithdrawMethodData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onWithdrawMethodData && (
                      <WithDrawMethod
                        onWithdrawMethodData={onWithdrawMethodData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onPendingWithdrawData && (
                      <PendingWithdraw
                        onPendingWithdrawData={onPendingWithdrawData}
                        onDelete={onDelete}
                      />
                    )}
                    {onReviewData && (
                      <Review onReviewData={onReviewData} onDelete={onDelete} />
                    )}

                    {onPendingSellerData && (
                      <PendingSellerWithdraw
                        onPendingSellerData={onPendingSellerData}
                        onDelete={onDelete}
                      />
                    )}
                    {onSellerWithdrawData && (
                      <SellerWithdraw
                        onSellerWithdrawData={onSellerWithdrawData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    )}
                    {onWithdrawPaymentData && (
                      <PaymentWithdrawMethod
                        onWithdrawPaymentData={onWithdrawPaymentData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    )}
                    {onContactMessageData && (
                      <ContactMessage
                        onContactMessageData={onContactMessageData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    )}
                    {onCustomerListData && (
                      <CustomerList
                        onCustomerListData={onCustomerListData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onSend={onSend}
                      />
                    )}
                    {onPendingCustomerListData && (
                      <PendingCustomerList
                        onPendingCustomerListData={onPendingCustomerListData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onSend={onSend}
                      />
                    )}
                    {onSellerListData && (
                      <SellerList
                        onSellerListData={onSellerListData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onSend={onSend}
                      />
                    )}
                    {onPendingSellerListData && (
                      <PendingSellerList
                        onPendingSellerListData={onPendingSellerListData}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onSend={onSend}
                      />
                    )}
                    {onEmailTemplateData && (
                      <EmailTemplate
                      onNavigate={onNavigate}
                        onEmailTemplateData={onEmailTemplateData}
                      />
                    )}
                      {onMailTemplateData && (
                      <MailTemplate
                      onMailTemplateData={onMailTemplateData}
                      />
                    )}
                    {onSmsConfigData && (
                      <SmsTemplate onSmsConfigData={onSmsConfigData} />
                    )}
                    {onSliderData && (
                     <Sliders onSliderData={onSliderData} onDelete={onDelete}
                     onUpdate={onUpdate}/>
                    )}
                    {onServiceData && (<Service onServiceData={onServiceData} onDelete={onDelete}
                     onUpdate={onUpdate}/>)}
                     {onHomepageTitleData && (<HomePageSessionTitle onHomepageTitleData={onHomepageTitleData} onUpdate={onUpdate}/>)}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <ReactPaginate
              breakLabel="..."
              nextLabel={<ArrowForwardIosRoundedIcon sx={{ fontSize: 18 }} />}
              pageRangeDisplayed={2}
              pageCount={10}
              previousLabel={<ArrowBackIosRoundedIcon sx={{ fontSize: 18 }} />}
              renderOnZeroPageCount={null}
              containerClassName={"react-pagination"}
              pageClassName={"page-item"}
              activeClassName={"page-active"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
