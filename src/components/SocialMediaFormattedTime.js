import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const SocialMediaFormattedTime = ({ timestamp }) => {
    const currentTime = moment();
    const postTime = moment.unix(timestamp);
    const diffMinutes = currentTime.diff(postTime, 'minutes');
    
    if (diffMinutes < 1) {
        return <span>Just Now</span>;
    } else if (diffMinutes < 5) {
        return <span>5 Minutes Ago</span>;
    } else if (diffMinutes < 10) {
        return <span>10 Minutes Ago</span>;
    } else if (diffMinutes < 15) {
        return <span>15 Minutes Ago</span>;
    } else if (diffMinutes < 30) {
        return <span>30 Minutes Ago</span>;
    } else if (diffMinutes < 60) {
        return <span>1 Hour Ago</span>;
    } else if (diffMinutes < 120) {
        return <span>2 Hours Ago</span>;
    } else if (diffMinutes < 180) {
        return <span>3 Hours Ago</span>;
    } else if (diffMinutes < 360) {
        return <span>6 Hours Ago</span>;
    } else if (diffMinutes < 720) {
        return <span>12 Hours Ago</span>;
    } else if (diffMinutes < 1440) {
        return <span>1 Day Ago</span>;
    } else if (diffMinutes < 2880) {
        return <span>2 Days Ago</span>;
    } else if (diffMinutes < 4320) {
        return <span>3 Days Ago</span>;
    } else if (diffMinutes < 10080) {
        return <span>1 Week Ago</span>;
    } else if (diffMinutes < 20160) {
        return <span>2 Weeks Ago</span>;
    } else {
    }
};

export default SocialMediaFormattedTime;