import React from 'react';

interface PropsType {
  heading: React.ReactNode;
  body: React.ReactNode;
}

export default function TableFooter({ heading, body }: PropsType) {
  return (
    <footer>
      {heading}
      {body}
    </footer>
  );
}
