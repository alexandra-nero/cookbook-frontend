import React, { useState } from "react";
import { Card, Form, Button, Transition, Message } from "semantic-ui-react";
import { login } from "./serviceCalls";
import get from 'lodash';

function Login({ setAccessToken }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await login(username, password);
      if (get(response, 'data.accessToken')) {
        setAccessToken(response.data.accessToken)
        setError(false)
      } else {
        setError(true)
      }
    }
    catch (err) {
      setError(true)
    }
  }

  return (
    <>
      <Transition visible={error} animation="scale" duration={500}>
        <Message
          negative
          onDismiss={() => setError(false)}
          header="Error"
          content={`Unknown username or password`}
        />
      </Transition>
      <Card style={{ marginTop: "5%" }} centered color="orange">
        <Card.Content>
          <Card.Header>
            Login
        </Card.Header>
        Only authorized users have access to this app.
        If you would like access, email nero.alexandraj@gmail.com.
      </Card.Content>
        <Card.Content>
          <Form onSubmit={async () => handleSubmit()}>
            <Form.Field>
              <input
                placeholder='Username'
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                autoComplete="current-password"
              />
            </Form.Field>
            <Form.Field>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Card.Content>
      </Card >
    </>
  );
}

export default Login;
