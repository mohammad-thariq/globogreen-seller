import DashboardIcon from "@mui/icons-material/Dashboard";
import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MessageIcon from '@mui/icons-material/Message';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


export const SideNavConst = {
  routes: [
    {
      heading: "Dashboard",
      url: "/",
      icon: <DashboardIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Order",
      icon: <GradingIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "All Orders",
          url: "/seller/all-orders",
        },
        {
          name: "Pending Orders",
          url: "/seller/pending-orders",
        },
        {
          name: "Progress Orders",
          url: "/seller/progress-orders",
        },
        {
          name: "Delivered Orders",
          url: "/seller/delivered-orders",
        },
        {
          name: "Completed Orders",
          url: "/seller/completed-orders",
        },
        {
          name: "Declined Orders",
          url: "/seller/declined-orders",
        },
        {
          name: "Cash On Delivery",
          url: "/seller/cash-on-delivery",
        },
      ],
    },
    {
      heading: "Product categories",
      icon: <ProductionQuantityLimitsIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Brands",
          url: "/seller/brands",
        },
        {
          name: "Product Bulk Import",
          url: "/seller/product-bulk",
        },
        {
          name: "Products",
          url: "/seller/products",
        },
        {
          name: "Stock Out",
          url: "/seller/stock-out",
        },
        {
          name: "Products Review",
          url: "/seller/products-review",
        },
        {
          name: "Products Report",
          url: "/seller/products-report",
        },
      ],
    },
    {
      heading: "Inventory",
      url: "/seller/inventory",
      icon: <ShoppingCartIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "My Withdraw",
      url: "/seller/my-withdraw",
      icon: <CurrencyRupeeIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Message",
      url: "/seller/message",
      icon: <MessageIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Visit User Dashboard",
      url: "/seller/visit-user-dashboard",
      icon: <DashboardIcon sx={{ fontSize: 18 }} />,
    },

  ],
};
















// 
// Sms Configuration

// Setting
// Clear Database

// Contact Message
// Admin list
// Contact Message


