import React, { useState } from "react";

const update = (parent, reference, changes) =>
    parent === reference
        ? { ...parent, ...changes }
        : { ...parent, attributes: update(parent.attributes, reference, changes) };

const Form = ({ attributes, setAttributes }) => (
    <div>
        Name:{" "}
        <input
            value={attributes.name}
            onChange={e => setAttributes(attributes, { name: e.target.value })}
        />
        Label:{" "}
        <input
            value={attributes.label}
            onChange={e => setAttributes(attributes, { label: e.target.value })}
        />
        {attributes.attributes ? (
            <Form attributes={attributes.attributes} setAttributes={setAttributes} />
        ) : (
            <button
                onClick={() =>
                    setAttributes(attributes, {
                        attributes: { name: "", label: "", attributes: null }
                    })
                }
            >
                Add
            </button>
        )}
    </div>
);

const InfiniteForm = props => {
    const [data, setData] = useState({
        name: "",
        label: "",
        attributes: null
    });

    return (
        <div>
            <textarea
                disabled
                value={JSON.stringify(data, null, 2)}
                style={{ width: "100%", height: "500px" }}
            />
            <Form
                attributes={data}
                setAttributes={(reference, changes) =>
                    setData(oldData => update(oldData, reference, changes))
                }
            />
        </div>
    );
};

export default InfiniteForm;