export default function UpdatedAt(props) {
  const { date } = props;
  return <span>Updated at: {new Date(date).toLocaleString("en-US")}</span>;
}
