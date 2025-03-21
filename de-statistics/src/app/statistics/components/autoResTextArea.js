
export default function AutoResizingTextArea(props) {

  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <textarea
      placeholder="Type your message here..."
      value={props.message}
      onChange={handleChange}
      style={{
        fontFamily: "monospace",
        fontSize: "16px",
        padding: "10px 10px 10px 10px",
        backgroundColor: "white",
        width: "80%",
        color: "black",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid #ccc",
        resize: "none",
      }}
      rows="1"
    />
  );
}
