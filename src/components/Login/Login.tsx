import { Placeholder, Text } from '@telegram-apps/telegram-ui';
import { TonConnectButton } from '@tonconnect/ui-react';

const Login = () => {
  return (
    <Placeholder
      className="ton-connect-page__placeholder"
      header="TON Connect"
      description={
        <>
          <Text>
            To display the data related to the TON Connect, it is required
            to connect your wallet
          </Text>
          <TonConnectButton className="ton-connect-page__button"/>
        </>
      }
    />
  );
}

export default Login;
