import React, { useState, useEffect } from 'react';
import './NeySvg.css';

interface Props {
  clearTrigger: number;
}

const NeySvg: React.FC<Props> = ({ clearTrigger }) => {
    const [pathColors, setPathColors] = useState<Record<string, string>>({});
    const [fillPercentages, setFillPercentages] = useState<Record<string, number>>({});
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (clearTrigger > 0) {
            setPathColors({});
            setFillPercentages({});
        }
    }, [clearTrigger]);

    const handlePathClick = (pathId: string, event: React.MouseEvent) => {
        event.preventDefault();
        setSelectedPath(pathId);
        setMenuPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const handlePercentageSelect = (percentage: number) => {
        if (selectedPath) {
            // Invert percentage for fill (100% = fully filled = black)
            const invertedPercentage = 100 - percentage;
            
            setFillPercentages(prev => ({
                ...prev,
                [selectedPath]: invertedPercentage
            }));

            // Special cases for 0% and 100%
            if (percentage === 100) {
                setPathColors(prev => ({
                    ...prev,
                    [selectedPath]: '#000000'  // Fully black
                }));
            } else if (percentage === 0) {
                setPathColors(prev => ({
                    ...prev,
                    [selectedPath]: '#ffffff'  // Fully white
                }));
            } else {
                setPathColors(prev => ({
                    ...prev,
                    [selectedPath]: `url(#grad-${selectedPath})`
                }));
            }
            
            setMenuPosition(null);
        }
    };

    return (
        <>
            {menuPosition && (
                <ul 
                    className="percentage-menu"
                    style={{
                        position: 'fixed',
                        left: menuPosition.x,
                        top: menuPosition.y,
                        zIndex: 1000
                    }}
                >
                    {[0, 75, 50, 25, 100].map(percent => (
                        <li 
                            key={percent}
                            onClick={() => handlePercentageSelect(percent)}
                        >
                            {percent}%
                        </li>
                    ))}
                </ul>
            )}
            <svg
                className="centered-svg"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="279.000000pt"
                height="1350.000000pt"
                viewBox="0 0 279.000000 1350.000000"
                preserveAspectRatio="xMidYMid meet"
            >

                <defs>
                    {Object.entries(fillPercentages).map(([pathId, percentage]) => (
                        <linearGradient 
                            key={pathId}
                            id={`grad-${pathId}`}
                            x1="0%" 
                            y1="0%" 
                            x2="0%" 
                            y2="100%"
                        >
                            <stop offset={`${percentage}%`} stopColor="white" />
                            <stop offset={`${percentage}%`} stopColor="black" />
                        </linearGradient>
                    ))}
                </defs>
                <g transform="translate(0.000000,1350.000000) scale(0.100000,-0.100000)"
                >
                    <path
                        id="main-body"
                        fill={pathColors['main-body'] || '#000000'}
                        d="M1056 12794 c-10 -9 -16 -33 -16 -62 0 -34 -8 -60 -30 -94 -51 -81
              -108 -111 -290 -152 -148 -34 -210 -57 -246 -94 -58 -60 -58 -147 1 -206 65
              -65 164 -96 308 -96 50 0 98 -4 105 -8 10 -7 12 -1164 12 -5755 0 -3715 3
              -5755 10 -5772 l10 -25 452 2 453 3 2 5765 c3 5406 4 5766 20 5778 10 7 51 12
              107 12 92 1 171 15 237 44 108 46 151 176 84 249 -28 29 -120 75 -167 83 -43
              7 -137 30 -220 56 -112 33 -181 110 -195 215 -3 27 -10 54 -16 61 -7 9 -81 12
              -308 12 -257 0 -300 -2 -313 -16z m692 -941 l-3 -218 -375 0 -375 0 -3 218 -2
              217 380 0 380 0 -2 -217z m-3 -908 l0 -590 -375 0 -375 0 -3 580 c-1 319 0
              586 3 593 3 10 84 12 377 10 l373 -3 0 -590z m3 -1647 l2 -958 -380 0 -380 0
              0 960 0 960 378 -2 377 -3 3 -957z m-3 -2018 l0 -955 -377 -3 -378 -2 0 960 0
              960 378 -2 377 -3 0 -955z m3 -1952 l-3 -893 -375 0 -375 0 -3 893 -2 892 380
              0 380 0 -2 -892z m-14 -994 c14 -6 16 -94 16 -895 l0 -889 -376 -2 c-207 -2
              -378 -1 -380 1 -7 7 -4 1777 3 1784 8 9 716 9 737 1z m14 -2396 l2 -508 -380
              0 -380 0 0 510 0 510 378 -2 377 -3 3 -507z m-32 -604 l34 -6 0 -359 0 -359
              -380 0 c-297 0 -380 3 -380 13 -3 194 0 700 4 706 7 10 670 15 722 5z"
                    />

                    <path
                        id="hole-1"
                        onClick={(event) => handlePathClick('hole-1', event)}
                        className='hole'
                        stroke="black"
                        strokeWidth="75"
                        fill={pathColors['hole-1'] || '#ffffff'}
                        d="M1464 9725 c-75 -33 -124 -130 -124 -243 0 -162 84 -275 192 -258 45
              7 73 31 114 96 27 43 29 51 29 155 0 121 -14 165 -72 215 -59 52 -85 59 -139
              35z"
                    />

                    <path
                        id="hole-2"
                        onClick={(event) => handlePathClick('hole-2', event)}
                        fill={pathColors['hole-2'] || '#ffffff'}
                        stroke="black"
                        strokeWidth="75"
                        d="M1318 7920 c-50 -27 -86 -76 -109 -152 -23 -76 -24 -107 -4 -173 33
              -108 76 -162 138 -172 49 -7 77 1 113 34 45 42 63 76 79 152 13 63 13 78 -1
              138 -18 82 -56 140 -109 170 -48 27 -60 28 -107 3z "
                    />
                    <path
                        id="hole-3"
                        onClick={(event) => handlePathClick('hole-3', event)}
                        fill={pathColors['hole-3'] || '#ffffff'}
                        stroke="black"
                        strokeWidth="75"
                        d="M1345 7161 c-134 -56 -171 -327 -60 -450 65 -71 120 -79 184 -25 70
              60 86 102 86 224 0 118 -15 164 -69 213 -48 45 -94 57 -141 38z"
                    />

                    <path
                        id="hole-4"
                        onClick={(event) => handlePathClick('hole-4', event)}
                        stroke="black"
                        strokeWidth="75"
                        fill={pathColors['hole-4'] || '#ffffff'}
                        d="M1275 6006 c-34 -34 -48 -59 -64 -114 -26 -84 -26 -99 -4 -187 15
              -59 26 -78 65 -117 43 -44 51 -48 93 -48 84 0 144 67 169 185 34 163 -50 325
              -169 325 -41 0 -50 -5 -90 -44z "
                    />

                    <path
                        id="hole-5"
                        onClick={(event) => handlePathClick('hole-5', event)}
                        fill={pathColors['hole-5'] || '#ffffff'}
                        stroke="black"
                        strokeWidth="75"
                        d="M1299 5095 c-43 -28 -71 -73 -93 -148 -20 -69 -20 -104 0 -175 31
              -108 85 -161 162 -162 45 0 57 4 88 33 46 41 61 70 78 151 20 97 -8 220 -62
              274 -57 57 -114 66 -173 27z "
                    />

                    <path
                        id="hole-6"
                        onClick={(event) => handlePathClick('hole-6', event)}
                        fill={pathColors['hole-6'] || '#ffffff'}
                        stroke="black"
                        strokeWidth="75"
                        d="M1294 4142 c-43 -31 -75 -88 -95 -170 -21 -83 13 -214 70 -271 25
              -25 75 -51 97 -51 73 0 145 84 168 197 13 60 13 76 0 135 -36 158 -144 230
              -240 160z "
                    />

                    <path
                        id="hole-7"
                        onClick={(event) => handlePathClick('hole-7', event)}
                        fill={pathColors['hole-7'] || '#ffffff'}
                        stroke="black"
                        strokeWidth="75"
                        d="M1299 3355 c-20 -13 -45 -39 -56 -58 -24 -40 -53 -134 -53 -170 0
              -50 33 -153 62 -193 37 -52 69 -69 125 -68 36 1 51 7 79 35 46 44 61 74 78
              156 13 59 13 77 0 133 -15 67 -35 111 -63 139 -56 56 -114 64 -172 26z"
                    />
                </g>
            </svg>
        </>
    );
};

export default NeySvg;