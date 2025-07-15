import React,{useState} from "react";
// import "./sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  RateReview as RateReviewIcon,
  ListAlt as ListAltIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  PostAdd as PostAddIcon,
  Add as AddIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
const Sidebar = (props) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  return (
    <div className={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'}   sidebar bg-red-100 flex flex-col p-6`}>
      {/* <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link> */}
      
      <Link to="/admin/dashboard" className="m-5 ">
        <p className="hover:bg-zinc-100 p-1 ml-2">
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <SimpleTreeView className="m-5"
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        slots={{
          expandIcon: ExpandMoreIcon,
          collapseIcon: ExpandMoreIcon,
        }}
      >
        <TreeItem className="m-6"
          itemId="products" 
          label={
            <div className="flex gap-1" >
              <InventoryIcon />Products
            </div>
          }
        >
          <TreeItem 
            itemId="all-products" 
            label={
              <Link to="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PostAddIcon />
                  All
                </div>
              </Link>
            }
          />
          <TreeItem 
            itemId="create-product" 
            label={
              <Link to="/admin/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AddIcon />
                  Create
                </div>
              </Link>
            }
          />
        </TreeItem>
      </SimpleTreeView>

      <Link to="/admin/orders" className="mx-5 my-4">
        <p className="hover:bg-zinc-100 p-1 ml-2">
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users" className="mx-5">
        <p className="hover:bg-zinc-100 p-1 ml-2">
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews" className="mx-5 my-4">
        <p className="hover:bg-zinc-100 p-1 ml-2">
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;