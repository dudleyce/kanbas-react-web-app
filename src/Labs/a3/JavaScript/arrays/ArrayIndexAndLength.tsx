function ArrayIndexAndLength () {
    let numberArray1 = [1, 2, 3, 4, 5];
    const length1 = numberArray1.length;
    const index1 = numberArray1.indexOf(3);

    return(
        <>
        <h4>Array Index and Length</h4>
        length1 = {length1}
        <br />
        index1 = {index1}
        </>
    )
}

export default ArrayIndexAndLength;