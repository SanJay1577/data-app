import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import BaseApp from '../Core/Base'

const Hooks = () => {
    const [count, setCount] = useState(0)
    const addCount = ()=>{
        //adding two times setCount (sync function)
        setCount((prev) => prev + 1 ) 
        setCount((prev) => prev + 1 ) 

        //adding two times no sync
        // setCount(count +1)
        // setCount(count +1)  
    }

    const subCount = ()=>{
        setCount((prev) => prev - 1 ) 
        setCount((prev) => prev - 1 ) 
    }
// effect hook
    useEffect(() => {
      console.log("called")
      //un mounting
    //   return ()=>{
    //    console.log("unmount")
    //   }
    refCout.current = refCout.current+1;
    }, [count]);
//for reducers 
    const reducerState = {counter : 0}
    //const actions = {}
    const reducer = (state, action)=>{
        switch(action.type){
            case "add-counter" : 
            return { ...state, counter : state.counter + 1}
            case "sub-counter" : 
            return { ...state, counter : state.counter - 1}
            case "reset-counter" :
              return {...state, counter : action.payload}
            default : 
            return state
        }
    }
    const [state, dispatch] = useReducer(reducer, reducerState);

    // useRef 
    const refCout = useRef(0);
    const eleRef = useRef()
const refFocus = ()=>{
  eleRef.current.focus();
}

const handleChange = useMemo( ()=>{
    for(let i =0; i< 1000000000; i++){}
    return count * 2
}, [count])

  return (
    <BaseApp
    title={"Hooks Learnings"}>
          <div>
            <div>
            <h1>Use State</h1>
            <p>count {count}</p>
            <button onClick={addCount}>add</button>{" "}
            <button onClick={subCount}>sub</button>
            </div>

            <div>
                <h1>use Reducers</h1>
                <p>Reducer count {state.counter}</p>
                <button onClick={()=>dispatch({type:"add-counter"})}>add</button>{" "}
                <button onClick={()=>dispatch({type:"sub-counter"})}>sub</button> {" "}
                <button onClick={()=>dispatch(
                       {
                        type:"reset-counter", 
                        payload: 5
                        }
                        )}>Reset</button>
            </div>

           <div>
            <h1>Use Ref</h1>
            <h1> Rendering count :{refCout.current}</h1>
            <input ref={eleRef}/> {" "}
            <button onClick={refFocus}>foucus the input</button>
           </div>
            <div>
                <h1>Use Memo</h1>
                <p>{handleChange}</p>
            </div>

            
          </div>
    </BaseApp>
  )
}

export default Hooks
