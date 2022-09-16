import React from 'react';
import "./ThreeDotsSelf.css"

const ThreeDotsSelf = ({setThreeDotsSelf}) => {
    return (
        <div className="threeDotsSelf_container" onClick={() => setThreeDotsSelf(false)}>
            <div className="threeDotsSelf_main" onClick={(e) => e.stopPropagation()}>
                <div>Delete</div>
                <div>Edit</div>
                <div>Hide like count</div>
                <div>Turn off commenting</div>
                <div>Go to post</div>
                <div>Share to...</div>
                <div>Copy link</div>
                <div>Embed</div>
                <div>Cancel</div>
            </div>
        </div>
    );
};

export default ThreeDotsSelf;