import React from 'react'
import { TouchableOpacity } from 'react-native'
import MathJax from 'react-native-mathjax';
import { styles } from './MathJaxButton.style';

const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
        ],
        processEscapes: true,
    },
    TeX: {
        extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
            "color.js"
        ],
    },
};

const MathJaxButton = ({
    children,
    backgroundColor = "#FFF",
    color = "#000",
    onPress = () => { }
}) => {
    return (
        <TouchableOpacity
            style={{ ...styles.container, backgroundColor: backgroundColor }}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <MathJax
                style={{ ...styles.button, backgroundColor: backgroundColor }}
                mathJaxOptions={mmlOptions}
                html={
                    `$
                    Y^X
                    $`
                }
            />
        </TouchableOpacity>
    )
}

export default MathJaxButton
