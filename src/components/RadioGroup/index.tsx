
import React, { useState } from 'react';
import { Option } from './Option';

interface IProps {
    options: React.ReactElement[];
    onChange?: (selectedIndex: number) => void;
    value: number[];
    labelText: string;
}

const RadioGroup = ({ options, onChange, value, labelText }: IProps) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>(value);

    function onSelect(index: number) {
        //TODO this seems as duplicated code from parent component, shall we pass the state from parent and that's it?
        selectedIndexes?.includes(index) ? setSelectedIndexes(selectedIndexes.filter((idx) => idx !== index)) : setSelectedIndexes([...selectedIndexes as any, index]);
        onChange && onChange(index);
    }
    return (
        <div>
            <h4 style={{ marginTop: '2rem', marginBottom: '0.6666667em' }} className="after:content-['⚙️'] after:ml-1">{labelText}</h4>
            <div className="flex justify-around">
                {options.map((el, index) => (
                    <Option
                        key={index}
                        index={index}
                        selectedIndexes={selectedIndexes}
                        onSelect={(index) => onSelect(index)}
                    >
                        {el}
                    </Option>
                ))}
            </div>
        </div>
    );
};
export default RadioGroup;