import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Newsletter.css";
import { useEffect } from "react";
import {
  getAllNewsletters,
  deleteNewsletter,
} from "../../../services/newsletter";
import { useState } from "react";
import Swal from "sweetalert2";

function createData(email, id, createdAt) {
  return { email, id, createdAt };
}

export default function BasicTable() {
  const [newsletter, setNewsletter] = useState([]);
  const rows = newsletter.map((elem) =>
    createData(elem.email, elem._id, elem.createdAt.split("T")[0])
  );
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNewsletter(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getAllNewsletters().then((res) => setNewsletter(res.data.newsletters));
  }, []);
  return (
    <div className="table-container-contact">
      <h1>Liste des contacts</h1>
      <h2>Vous pouvez voir la liste des contacts dans cette page</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Date d'inscription</TableCell>
              <TableCell align="right">َAction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell
                    align="right"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(row.id)}
                  >
                    delete
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  aucun contact
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
