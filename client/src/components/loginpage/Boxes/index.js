import React, { useState } from 'react';

// Boxes
import { Wrapper, Box } from './Boxes.styles'
import { RegistrationSystem, LoginSystem, Message } from '../Authentication';

const Boxes = () => {
  const [displaying, setDisplaying] = useState("Registration");
  const [message, setMessage] = useState({error: false, text: ""});

  return (
    <Wrapper>
      {displaying === "Registration" || displaying === "Login"
      ?<h1>{displaying}</h1> : <h1> </h1>
      }
      <Box>
        {displaying === "Registration"
          ? <RegistrationSystem setDisplaying={setDisplaying} setMessage={setMessage} />
          : displaying === "Login"
          ? <LoginSystem setDisplaying={setDisplaying} setMessage={setMessage} />
          : <div></div>
        }
        <Message isError={message.error} text={message.text} />
      </Box>
    </Wrapper>
  );
}

export default Boxes;
