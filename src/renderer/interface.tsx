import React from 'react';
import { Stack, Button, Grid, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const configFields = [
  'chain_rpc_addresses',
  'handshake_enable',
  'keyring_backend',
  'node_ipv4_address',
  'node_listen_on',
  'node_moniker',
  'node_price',
  'node_provider',
  'node_remote_url',
  'node_type',
  'listen_port',
  'transport',
  'mnemonic',
  'passphrase',
];

const DVPNInterface: React.FC<{
  container: string;
  setCurrentContainer: React.Dispatch<React.SetStateAction<string | undefined>>;
  getContainers: () => Promise<void>;
  defaultConfig: { [key: string]: string };
}> = ({ container, setCurrentContainer, getContainers, defaultConfig }) => {
  const [keyring, setKeyring] = React.useState<string>();
  const [output, setOutput] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('Loading');
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
  const [config, setConfig] = React.useState<{ [key: string]: string }>();
  const [open, setOpen] = React.useState(false);

  const updateStatus = (containerName: string) => {
    if (container)
      window.electron.ipcRenderer
        .custom([containerName, 'status'])
        .then((res) => {
          setStatus(res);
        });
  };

  React.useEffect(() => {
    setConfig(defaultConfig);
  }, [defaultConfig]);

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
      <Modal open={open} onClose={() => setOpen(false)}>
        <Grid container sx={modalStyle} spacing={1}>
          {configFields.map((field) => (
            <Grid item xs={12} key={field}>
              {(config && config!['node_type'] === 'v2ray') ||
              field !== 'transport' ? (
                <TextField
                  type={field === 'passphrase' ? 'password' : 'text'}
                  label={field}
                  value={(config && config[field]) || ''}
                  onChange={(e) =>
                    setConfig({ ...config, [field]: e.target.value })
                  }
                  size="small"
                  fullWidth
                ></TextField>
              ) : (
                <></>
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={async () => {
                if (config && config.mnemonic === undefined)
                  alert('Mnemonic cannot be undefined');
                else if (config && config.passphrase === undefined)
                  alert('Passphrase cannot be undefined');
                else {
                  const res = await window.electron.ipcRenderer.run([
                    container,
                    'init',
                    JSON.stringify({ ...config }),
                  ]);
                  setOutput(res);
                  setOpen(false);
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Modal>
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
        <Button
          variant="contained"
          sx={{ fontSize: '2rem', padding: '1rem' }}
          onClick={() => {
            setOpen(true);
            // }
            // window.electron.ipcRenderer
            //   .run([
            //     container,
            //     'init',
            //     JSON.stringify({ ...config, mnemonic, passphrase }),
            //   ])
            //   .then((res) => setOutput(res));
          }}
        >
          Init
        </Button>
        <TextField
          type="password"
          placeholder="Enter keyring passphrase"
          value={keyring || ''}
          onChange={(e) => setKeyring(e.target.value)}
          size="small"
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
