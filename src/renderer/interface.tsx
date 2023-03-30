import React from 'react';
import { Stack, Button, Grid, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

const DVPNInterface: React.FC<{
  container: string;
  setCurrentContainer: React.Dispatch<React.SetStateAction<string | undefined>>;
  getContainers: () => Promise<void>;
}> = ({ container, setCurrentContainer, getContainers }) => {
  const [keyring, setKeyring] = React.useState<string>();
  const [mnemonic, setMnemonic] = React.useState<string>();
  const [passphrase, setPassphrase] = React.useState<string>();
  const [output, setOutput] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('Loading');
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();

  const updateStatus = (containerName: string) => {
    if (container)
      window.electron.ipcRenderer
        .custom([containerName, 'status'])
        .then((res) => {
          setStatus(res);
        });
  };

  React.useEffect(() => {
    const interval = setInterval(() => updateStatus(container), 1000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, [container]);

  const back = () => {
    getContainers();
    setCurrentContainer(undefined);
  };

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" p={2}>
          <Grid item sx={{ fontSize: '1.5rem' }}>
            <Button onClick={() => back()}>Back</Button>
          </Grid>
          <Grid item sx={{ fontSize: '1.5rem' }}>
            {container ? container : ''}
          </Grid>
          <Grid item sx={{ fontSize: '1.5rem' }}>
            {status}
          </Grid>
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() => {
            if (container === undefined)
              alert('Container name cannot be empty');
            else
              window.electron.ipcRenderer
                .run([container, 'setup'])
                .then((res) => setOutput(res));
          }}
        >
          Setup
        </Button>
        <TextField
          placeholder="Enter mnemonic"
          value={mnemonic || ''}
          onChange={(e) => setMnemonic(e.target.value)}
        ></TextField>
        <TextField
          type="password"
          placeholder="Enter keyring passphrase"
          value={passphrase || ''}
          onChange={(e) => setPassphrase(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() => {
            if (mnemonic === undefined) alert('Mnemonic cannot be undefined');
            else if (passphrase === undefined)
              alert('Passphrase cannot be undefined');
            else
              window.electron.ipcRenderer
                .run([container, 'init', mnemonic, passphrase])
                .then((res) => setOutput(res));
          }}
        >
          Init
        </Button>
        <TextField
          type="password"
          placeholder="Enter keyring passphrase"
          value={keyring || ''}
          onChange={(e) => setKeyring(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() => {
            if (keyring === undefined) alert('Keyring cannot be undefined');
            else
              window.electron.ipcRenderer
                .run([container, 'start', keyring])
                .then((res) => {
                  setOutput(res);
                });
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() =>
            window.electron.ipcRenderer
              .run([container, 'stop'])
              .then((res) => setOutput(res))
          }
        >
          Stop
        </Button>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={async () => {
            if (intervalId) clearInterval(intervalId);
            await window.electron.ipcRenderer.run([container, 'remove']);
            back();
          }}
        >
          Remove
        </Button>
      </Stack>
      <Grid container mt={10}>
        <Textarea
          sx={{
            width: '100%',
            background: '#1e282c',
            fontSize: '1.2rem',
          }}
          value={output}
          minRows={20}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default DVPNInterface;
