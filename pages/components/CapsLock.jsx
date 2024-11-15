function CapsLock(props) {
  const { text } = props;

  console.log(text);

  return <h1>{text.toUpperCase()}</h1>;
}

export default CapsLock;
