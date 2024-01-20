import React from 'react'

interface BoxModelProps {
    data: string[];
    max: number;
    selectedItems: string[];
    handleSave: (selectedItems: string[]) => void;
}

const BoxModel = ({ data, max, selectedItems, handleSave }: BoxModelProps) => {

    const handleSkillSelection = (skill: string) => {
        if (selectedItems.includes(skill)) {
            handleSave(selectedItems.filter((selected) => selected !== skill));
        } else {
            if (selectedItems.length < max) {
                handleSave([...selectedItems, skill]);
            }
        }
    };


    const renderSkillCheckbox = (skill: string) => {
        const isDisabled = selectedItems.length >= max && !selectedItems.includes(skill);
        const isChecked = selectedItems.includes(skill);

        return (
            <div key={skill} className='flex flex-grow select-none'>
                <label htmlFor={skill} className={`rounded py-1 px-2 flex-grow text-center`}
                    style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', opacity: isDisabled ? 0.4 : 1, backgroundColor: isChecked ? "#6C4" : "#F3F3F3", color: isChecked ? "#FFF" : "#000" }}>
                    <input
                        id={skill}
                        className="hidden"
                        type="checkbox"
                        value={skill}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => !isDisabled && handleSkillSelection(skill)}
                    />
                    {skill}
                </label>
            </div>
        )
    };

    return (
        <div className='flex flex-wrap gap-2'>
            {data.map((skill) => renderSkillCheckbox(skill))}
        </div>
    )
}

export default BoxModel