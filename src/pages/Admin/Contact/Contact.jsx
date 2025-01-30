import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Contact.css";
import { useEffect } from "react";
import { getContact, DeleteContact } from "../../../services/contactservices";
import { useState } from "react";
import Swal from "sweetalert2";

function createData(name, firstName, email, phonenumber, motif, message, id) {
  return { name, firstName, email, phonenumber, motif, message, id };
}

export default function BasicTable() {
  const [contact, setContact] = useState([]);
  const rows = contact.map((elem) =>
    createData(
      elem.name,
      elem.firstName,
      elem.email,
      elem.phonenumber,
      elem.motif,
      elem.message,
      elem._id
    )
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
        await DeleteContact(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getContact().then((res) => setContact(res.data.Contacts));
  }, []);
  return (
    <div className="table-container-contact">
      <h1>Liste des contacts</h1>
      <h2>Vous pouvez voir la liste des contacts dans cette page</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Prenom</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Numéro de téléphone</TableCell>
              <TableCell align="right">Motif</TableCell>
              <TableCell align="right">Message</TableCell>
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
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phonenumber}</TableCell>
                  <TableCell align="right">{row.motif}</TableCell>
                  <TableCell align="right">{row.message}</TableCell>
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
