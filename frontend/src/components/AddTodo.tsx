import React, { useState } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";

type AddTodoProps = {
  onItemAdd: (todo: { name: string }) => void;
};

export const AddTodo: React.FC<AddTodoProps> = ({ onItemAdd }) => {
  const [name, setName] = useState("");

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              onItemAdd({ name });
              setName("");
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
