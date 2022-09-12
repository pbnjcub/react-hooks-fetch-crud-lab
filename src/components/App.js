import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((resp) => resp.json())
    .then((questions) => setQuestions(questions))
  }, [])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((filter) => filter.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    }) 
    setQuestions(updatedQuestions)
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} setQuestions={setQuestions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
