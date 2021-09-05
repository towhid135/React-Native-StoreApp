import React from 'react';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";
import Color from '../../constants/Color';
import { CurrentRenderContext } from '@react-navigation/core';

const CustomHeaderButton = props =>{
    return (
        <HeaderButton
         {...props}
         IconComponent = {Ionicons}
         />
    )
};

export default CustomHeaderButton;
