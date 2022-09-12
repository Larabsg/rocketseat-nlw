interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return <button>{props.title}</button>
}

function App() {
  return (
    <div>
      <Button title="Send 1"/>
      <Button title="Send 2"/>
      <Button title="Send 3"/>
      <Button title="Send 4"/>
    </div>
  )
}

export default App
