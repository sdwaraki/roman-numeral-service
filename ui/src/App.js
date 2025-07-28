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
  //For input
  const [input, setInput] = useState('');
  //For output
  const [output, setOutput] = useState('');
  //For dark and light mode
  const [isDark, setIsDark] = useState(false);

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
    <Provider theme={theme} locale={navigator.language}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        backgroundColor={isDark ? 'gray-900' : 'gray-50'}
        gap="size-200"
      >

            <Button variant="primary" onPress={() => setIsDark(prev => !prev)}>
              {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>

            <View
              backgroundColor={isDark ? 'static-black' : 'white'}
              padding="size-300"
              borderRadius="regular"
            >
                  <Heading level={2} marginBottom="size-200" justifySelf="center">
                         Roman numeral converter
                   </Heading>

                  <TextField
                    label="Enter a number"
                    type="text"
                    value={input}
                    onChange={setInput}
                    width="100%"
                    marginBottom="size-400"
                  />

                  <Button variant="secondary" onPress={convert} width="100">
                        Convert to roman numeral
                  </Button>

                  {output && (
                    <Heading level={3} marginTop="size-200">
                       {output}
                    </Heading>
                  )}
            </View>
      </Flex>
    </Provider>
  );
}