import { Box, Button } from "@mui/material";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";

import CustomSnackbar from "../../../components/CustomSnackbar";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../../components/Loader";
import React from "react";
import { useGetHomesQuery } from "../../../api/apiSlice";
import { useHomesWithCompleted } from "../../../hooks/useHomesWithCompleted";

// Formats addresses
export const getAddress = (params) => {
  let unit_number = "";
  if (params.getValue(params.id, "unit_number")) {
    unit_number = `, Unit #${params.getValue(params.id, "unit_number")}`;
  }
  return `${params.getValue(params.id, "street_number")} ${params.getValue(
    params.id,
    "street_name"
  )}${unit_number && unit_number}`;
};

const HomeTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs([
    { url: "/admin/dashboard", description: "dashboard" },
    { url: "/admin/home", description: "homes" },
  ]);

  const handleHomeLink = (home) => goToBreadcrumb("home", home);

  const handleAssignmentLink = (assignment) =>
    goToBreadcrumb("assignment", assignment);

  const columns = [
    { field: "id", headerName: "Id", minWidth: 80 },
    {
      field: "address",
      valueGetter: getAddress,
      headerName: "Address",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 100,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      minWidth: 100,
      maxWidth: 100,
      flex: 0.8,
    },
    {
      field: "completed",
      headerName: "Completed",
      renderCell: (params) => (params.row.completed === true ? "Yes ✅" : "No"),
      minWidth: 100,
      maxWidth: 150,
      flex: 0.8,
    },
    {
      field: "assignment_id",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleAssignmentLink(params.row)}
        >
          {params.row.assignment_id}
        </Button>
      ),
      headerName: "Assignment",
      width: 110,
    },
    {
      field: "home",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => handleHomeLink(params.row)}
        >
          View
        </Button>
      ),
      headerName: "Home",
      maxWidth: 80,
    },
  ];

  const {
    data: homesData,
    isError: isHomesError,
    isLoading: isHomesDataLoading,
  } = useGetHomesQuery();

  const homesWithCompleted = useHomesWithCompleted(homesData);

  if (isHomesDataLoading) {
    return <Loader />;
  }

  return (
    <Box>
      {isHomesError ? (
        <CustomSnackbar
          open={isHomesError}
          message="Error fetching homes data."
          severity="error"
        />
      ) : (
        <DataGrid
          rows={homesWithCompleted}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </Box>
  );
};

export default HomeTable;
