import { Placeholder, Text } from "@telegram-apps/telegram-ui"

export const ConnectionRestoring = () => {
  return (
    <Placeholder
      className="ton-connect-page__placeholder"
      description={
        <Text>
          Restoring page data...
        </Text>
      }
    />
  )
}

export default ConnectionRestoring;
