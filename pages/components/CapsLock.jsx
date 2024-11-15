function CapsLock(props) {
  const { text } = props;

  console.log(text);
  const textTransformed = text.toUpperCase();

  return <h1>{textTransformed}</h1>;
}

export default CapsLock;
