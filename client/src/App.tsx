import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function App() {
  return (
    <>
      <h1>Stock Manage</h1>
      <Button variant="text">Text</Button>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
    </>
  );
}
