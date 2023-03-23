import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Stack, Button, Grid, TextField } from '@mui/material';

const DVPNInterface = () => {
  const [keyring, setKeyring] = React.useState<string>();
  const [mnemonic, setMnemonic] = React.useState<string>();
  const [passphrase, setPassphrase] = React.useState<string>();
  return (
    <Grid container justifyContent="center">
      <Stack spacing={2}>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() =>
            window.electron.ipcRenderer.sendMessage('run', ['setup'])
          }
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
              window.electron.ipcRenderer.sendMessage('run', [
                'init',
                mnemonic,
                passphrase,
              ]);
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
              window.electron.ipcRenderer.sendMessage('run', [
                'start',
                keyring,
              ]);
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() =>
            window.electron.ipcRenderer.sendMessage('run', ['stop'])
          }
        >
          Stop
        </Button>
      </Stack>
    </Grid>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DVPNInterface />} />
      </Routes>
    </Router>
  );
}
