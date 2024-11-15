function CapsLock(props) {
  const { text } = props;

  const textTransformed = text?.toUpperCase();

  return <h1>{textTransformed}</h1>;
}

export default CapsLock;
