const PageSizeSelect = (props: any) => {
    // useEffect(() => {
    //     console.log(props)
    // }, []);


    const sizeChange = (e: any) => {
        props.onViewSizeChangeEvent(Number(e))
    }

    return (
        <>
            {/*react 에선 selected 대신 value 값을 사용*/}
            <select title="선택" className="component-select size-medium common-width-a" onChange={(e)=> sizeChange(e.target.value)}>
                {
                    props.optionList && props.optionList.map((item: any, index: number) => (
                        <option value={item.value} key={item.value+'_'+index}>{item.label}</option>
                    ))
                }
            </select>
        </>
    );
};

export default PageSizeSelect;