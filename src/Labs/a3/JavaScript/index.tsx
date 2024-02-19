import MapFunction from "./arrays/MapFunction";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import ArrowFunctions from "./functions/ArrowFunctions";
import ES5Functions from "./functions/ES5functions";
import Destructing from "./functions/FunctionDestructing";
import FunctionParenthesisAndParemeters from "./functions/FunctionParenthesisAndParameters";
import ImpliedReturn from "./functions/ImpliedReturn";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants from "./variables/VariablesAndConstants";

function JavaScript() {
    console.log('Hello World!');
    return (
        <div>
            <h3>JavaScript</h3>
            <Destructing />
            <MapFunction />
            <WorkingWithArrays />
            <FunctionParenthesisAndParemeters />
            <ImpliedReturn />
            <ArrowFunctions />
            <ES5Functions />
            <TernaryOperator />
            <IfElse />
            <BooleanVariables />
            <VariableTypes />
            <VariablesAndConstants />
        </div>
    )
}

export default JavaScript;