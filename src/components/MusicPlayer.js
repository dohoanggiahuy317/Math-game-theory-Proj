import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ isPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch((error) => {
                console.log('Autoplay prevented:', error);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src={`${process.env.PUBLIC_URL}music/music.mp3`} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicPlayer;
