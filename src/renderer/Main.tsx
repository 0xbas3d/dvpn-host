import React from 'react';
import DVPNInterface from './interface';
import { Grid, Button, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Main = () => {
  const [containers, setContainers] = React.useState<string[]>([]);
  const [currentContainer, setCurrentContainer] = React.useState<string>();
  const [newContainer, setNewContainer] = React.useState<string>();

  const getContainers = async () => {
    const containers: string = await window.electron.ipcRenderer.custom([
      '#',
      'containers',
    ]);
    setContainers(
      containers.split('\n').filter((container) => container.length > 0)
    );
  };
  React.useEffect(() => {
    getContainers();
  }, []);
  if (currentContainer)
    return (
      <DVPNInterface
        container={currentContainer}
        setCurrentContainer={setCurrentContainer}
        getContainers={getContainers}
      />
    );
  else
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} textAlign="center" sx={{ fontSize: '2rem' }}>
          Choose container
        </Grid>
        {containers.map((container, index) => (
          <Grid
            key={`container_${index}`}
            item
            xs={12}
            textAlign="center"
            sx={{ fontSize: '2rem' }}
          >
            <Button
              variant="contained"
              onClick={() => setCurrentContainer(container)}
            >
              {container}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12} textAlign="center">
          <TextField
            value={newContainer || ''}
            onChange={(e) => setNewContainer(e.target.value)}
            placeholder="New Container"
          ></TextField>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <AddCircleIcon
            fontSize="large"
            color="primary"
            onClick={() => {
              setCurrentContainer(newContainer);
              setNewContainer(undefined);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Grid>
      </Grid>
    );
};

export default Main;
