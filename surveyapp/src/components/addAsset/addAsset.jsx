import React,{useState} from 'react';
import './addAsset.css';

let divKey = 1;

const AddAsset = props => {
    const [inputValue, setInputValue] = useState("");

    const addAssetOnClick = () => {
        let assetValue = inputValue;
        if(/^\s*$/i.test(assetValue)){
            setInputValue("");
            return;
        }
        const handleAssetClick = e =>{
            console.log(e.currentTarget.getAttribute('data-assetkey'));
            props.setSelectedAsset(e.currentTarget.getAttribute('data-assetkey'));
            console.log(props.selectedAsset);
        }
        props.setDivs([...props.divs, {divId:divKey,
            content:(
            <div className='assetItem' data-assetkey={divKey} onClick={handleAssetClick}>
                <div className='assetItem1'>
                    <div className='assetItem2' >{assetValue}</div>
                    <div className='assetItem3'>x</div>
                </div>
            </div>
        ),
        imageUpload:(
            <div data-imagekey={divKey} style={{display:props.selectedAsset===`${divKey}`?'block':'none'}}>{props.selectedAsset} {divKey}</div>
        )}]);
        setInputValue("");
        divKey++;
    }

    return (
        <div className='assets1' >
            <div className='assets3'>
                <button className="giveTargetBtn" onClick={()=>props.setSelectedAsset('target')}>Give Target Input</button>
            </div>
            {/* <div className='assets2'> */}
                <div className='assetInput'>
                    <div className='assetInput1'>
                        <input type='text' className='assetInput2' value={inputValue} onChange={e=>setInputValue(e.target.value)} />
                    </div>
                    <div className='assetAddBtn'>
                        <button onClick={() => addAssetOnClick()}>Add</button>
                    </div>
                </div>
            {/* </div> */}
            {props.divs.map(div => div.content)}
        </div>
    )
}

export default AddAsset