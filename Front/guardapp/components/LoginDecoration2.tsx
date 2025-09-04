import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';

export default function LoginDecorationBottom() {
    return (
        <Svg
            height="99"
            width="100%"
            viewBox="0 0 1440 320"
            style={{
                position: 'absolute',
                bottom: 0,
                transform: [{ rotate: '180deg' }],
            } as ViewStyle}
        >
            <Path
                fill="#0AB5FFFF"
                d="M0,64L48,69.3C96,75,192,85,288,96C384,107,480,117,576,128C672,139,768,149,864,144C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
        </Svg>
    );
}