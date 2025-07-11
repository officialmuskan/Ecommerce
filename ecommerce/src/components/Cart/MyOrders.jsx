

import React, { useEffect } from "react";
// import { DataGrid } from "@material-ui";

// import { DataGrid } from "@mui/";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";


Loader
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
Launch
// import LaunchIcon from "@material-ui/icons/Launch";
// import Typography from "@material-ui/core/Typography";
import { myOrder } from "../../actions/orderActions";
import Loader from "../Loader";
import { Launch } from "@mui/icons-material";

const MyOrders = (props) => {
  const dispatch = useDispatch();
//   const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
    <span className={params.value === "Delivered" ? "text-green-600" : "text-red-600"}>
      {params.value}
    </span>
  ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.row.id}`}
            className="text-indigo-500 hover:text-indigo-700"
          >
            <Launch />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert(error);
 
    }

    dispatch(myOrder());
  }, [dispatch, error]);

  return (
    <>
      
      {loading ? (
        <Loader />
      ) : (
        <div className={`${props.mode === 'dark'?"bg-gray-800":"bg-white"} min-h-screen w-full px-4 py-6 bg-gray-100`}>
          {/* Heading */}
          <div className="bg-indigo-500 py-4 text-center rounded-md mb-4">
            <h1 className="text-white text-xl md:text-2xl font-semibold">
              {user.name}'s Orders
            </h1>
          </div>

          {/* Table */}
          <div className="bg-black rounded-md shadow-md overflow-auto">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              getRowClassName={(params) =>
                props.mode !== 'dark' ?
                    (params.indexRelativeToCurrentPage % 2 === 0 
                  ? "bg-white text-black"
                  : "bg-gray-100") : (params.indexRelativeToCurrentPage % 2 === 0 
                  ? "bg-gray-900 text-white"
                  : "bg-gray-800 text-white")
                

                
              }
              sx={{
                "&.MuiDataGrid-columnHeaders":{
                    backgroundColor: "red"
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  // Tailwind indigo-500
                  color: "black",
                  fontSize: "1rem",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "0.95rem",
                },
                "& .MuiDataGrid-cell:hover": {
                    background:""// Tailwind gray-100
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
