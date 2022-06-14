import {useState} from 'react'
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => {
        setGood(good + 1)
    }
    const increaseNeutral = () => {
        setNeutral(neutral + 1)
    }
    const increaseBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={increaseGood} text="good"/>
            <Button onClick={increaseNeutral} text="neutral"/>
            <Button onClick={increaseBad} text="bad"/>
            <h2>statistics</h2>
            {(() => {
                if ((good + neutral + bad > 0)) {
                    return (
                        <>
                            <StatisticLine text="good" stat={good}/>
                            <StatisticLine text="neutral" stat={neutral}/>
                            <StatisticLine text="bad" stat={bad}/>
                            <StatisticLine text="all" stat={good + neutral + bad}/>
                            <StatisticLine text="positive" stat={good / (good + neutral + bad)}/>
                        </>
                    );
                } else {
                    return <div>No feedback given</div>;
                }
            })()}

        </div>
    )
}

export default App