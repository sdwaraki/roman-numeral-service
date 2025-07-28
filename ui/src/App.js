import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  darkTheme,
  Flex,
  View,
  Heading,
  TextField,
  Button
} from '@adobe/react-spectrum';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isDark, setIsDark] = useState(false); // Manual toggle for light/dark

  // Choose theme
  const theme = isDark ? darkTheme : defaultTheme;

  const convert = async () => {
    try {
      const res = await fetch(`/romannumeral?query=${input}`);
      if (res.ok) {
        const { output: roman } = await res.json();
        setOutput(roman);
      } else {
        const err = await res.text();
        setOutput(err);
      }
    } catch {
      setOutput('Error contacting the conversion service.');
    }
  };

  return (
    <Provider theme={theme} colorScheme={isDark ? 'dark' : 'light'} locale={navigator.language}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        backgroundColor={isDark ? 'gray-900' : 'gray-50'}
        gap="size-200"
      >
        {/* Toggle light/dark mode */}
        <Button
          variant="secondary"
          onPress={() => setIsDark(prev => !prev)}
          marginBottom="size-200"
        >
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>

        {/* Content card */}
        <View
          backgroundColor={isDark ? 'static-black' : 'gray-75'}
          padding="size-300"
          borderRadius="regular"
          width="size-3600"
        >
          <Flex direction="column" alignItems="center" gap="size-200">
            <Heading level={2} marginBottom="size-200">
              Roman numeral converter
            </Heading>

            <TextField
              label="Enter a number"
              type="text"
              value={input}
              onChange={setInput}
              width="100%"
              marginBottom="size-200"
            />

            <Button
              variant={isDark ? 'overBackground' : 'primary'}
              onPress={convert}
              width="100%"
            >
              Convert to roman numeral
            </Button>

            {output && (
              <Heading level={3} marginTop="size-200">
                Roman numeral: {output}
              </Heading>
            )}
          </Flex>
        </View>
      </Flex>
    </Provider>
  );
}
