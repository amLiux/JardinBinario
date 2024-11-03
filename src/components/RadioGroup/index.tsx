import { useState } from 'react';
import { Option } from './Option';
import optionsStyles from './Option/Option.module.css';
import { Flexbox } from '../lib/Flexbox';

interface IProps {
    options: React.ReactElement[];
    onChange?: (selectedIndex: number) => void;
    value: number[];
    labelText: string;
}

export const RadioGroup = ({ options, onChange, value, labelText }: IProps) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>(value);

    function onSelect(index: number) {
        //TODO this seems as duplicated code from parent component, shall we pass the state from parent and that's it?
        selectedIndexes?.includes(index) ? setSelectedIndexes(selectedIndexes.filter((idx) => idx !== index)) : setSelectedIndexes([...selectedIndexes as any, index]);
        onChange && onChange(index);
    }

    return (
        <div>
            <h4 style={{ marginTop: '2rem', marginBottom: '0.6666667em' }}>{labelText}</h4>
            <Flexbox wrap extraClass={optionsStyles.container}>
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
            </Flexbox>
        </div>
    );
};
