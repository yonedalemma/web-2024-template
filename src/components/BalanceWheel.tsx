import { useState } from "react";
import {
  Typography,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

interface Segment {
  name: string;
  value: number;
}

const DEFAULT_SEGMENTS: Segment[] = [
  { name: "Здоровье", value: 5 },
  { name: "Финансы", value: 5 },
  { name: "Отношения", value: 5 },
  { name: "Работа", value: 5 },
  { name: "Творчество", value: 5 },
  { name: "Личностное развитие", value: 5 },
  { name: "Отдых", value: 5 },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const BalanceWheel = () => {
  const [segments, setSegments] = useState<Segment[]>(DEFAULT_SEGMENTS);

  const handleNameChange = (index: number, newName: string) => {
    const newSegments = [...segments];
    newSegments[index].name = newName;
    setSegments(newSegments);
  };

  const handleValueChange = (index: number, newValue: number) => {
    const newSegments = [...segments];
    newSegments[index].value = newValue;
    setSegments(newSegments);
  };

  const addSegment = () => {
    setSegments([...segments, { name: "Новая область", value: 5 }]);
  };

  const removeSegment = (index: number) => {
    const newSegments = segments.filter((_, i) => i !== index);
    setSegments(newSegments);
  };

  const renderWheel = () => {
    const totalSegments = segments.length;
    const centerX = 250;
    const centerY = 250;
    const radius = 200;
    const textRadius = radius + 20;
    const levelCount = 10;

    return (
      <svg width="500" height="500" viewBox="0 0 500 500">
        {/* Рисуем круги уровней */}
        {Array.from({ length: levelCount }).map((_, index) => {
          const levelRadius = ((index + 1) / levelCount) * radius;
          return (
            <circle
              key={`level-${index}`}
              cx={centerX}
              cy={centerY}
              r={levelRadius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}

        {/* Рисуем сегменты, их значения и названия */}
        {segments.map((segment, index) => {
          const startAngle = (index / totalSegments) * 2 * Math.PI;
          const endAngle = ((index + 1) / totalSegments) * 2 * Math.PI;
          const midAngle = (startAngle + endAngle) / 2;
          
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);

          const valueRadius = (segment.value / 10) * radius;
          const valueStartX = centerX + valueRadius * Math.cos(startAngle);
          const valueStartY = centerY + valueRadius * Math.sin(startAngle);
          const valueEndX = centerX + valueRadius * Math.cos(endAngle);
          const valueEndY = centerY + valueRadius * Math.sin(endAngle);

          const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

          // Определяем, находится ли текст в верхней половине круга
          const isTopHalf = midAngle > Math.PI && midAngle < 2 * Math.PI;

          // Создаем путь для текста
          const textPathId = `textPath-${index}`;
          const textPathD = isTopHalf
            ? `M ${centerX + textRadius * Math.cos(startAngle)} ${centerY + textRadius * Math.sin(startAngle)} 
               A ${textRadius} ${textRadius} 0 ${largeArcFlag} 1 
               ${centerX + textRadius * Math.cos(endAngle)} ${centerY + textRadius * Math.sin(endAngle)}`
            : `M ${centerX + textRadius * Math.cos(endAngle)} ${centerY + textRadius * Math.sin(endAngle)} 
               A ${textRadius} ${textRadius} 0 ${largeArcFlag} 0 
               ${centerX + textRadius * Math.cos(startAngle)} ${centerY + textRadius * Math.sin(startAngle)}`;

          return (
            <g key={index}>
              {/* Линия сегмента */}
              <line x1={centerX} y1={centerY} x2={x1} y2={y1} stroke="black" />

              {/* Дуга значения */}
              <path
                d={`M ${valueStartX} ${valueStartY} A ${valueRadius} ${valueRadius} 0 ${largeArcFlag} 1 ${valueEndX} ${valueEndY}`}
                fill="none"
                stroke="red"
                strokeWidth="3"
              />

              {/* Путь для текста */}
              <path
                id={textPathId}
                d={textPathD}
                fill="none"
              />

              {/* Название сегмента */}
              <text fontSize="12" fill="black">
                <textPath 
                  href={`#${textPathId}`} 
                  startOffset="50%"
                  textAnchor="middle"
                >
                  <tspan dy={isTopHalf ? "-5" : "15"}>
                    {segment.name}
                  </tspan>
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Колесо баланса
      </Typography>
      {renderWheel()}
      <StyledPaper>
        <Grid container spacing={2}>
          {segments.map((segment, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={`Область ${index + 1}`}
                value={segment.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                margin="normal"
              />
              <Typography gutterBottom>{segment.name}: {segment.value}</Typography>
              <Slider
                value={segment.value}
                onChange={(_, newValue) => handleValueChange(index, newValue as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
              <Button onClick={() => removeSegment(index)} color="secondary">
                Удалить
              </Button>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>
      <Button onClick={addSegment} variant="contained" color="primary">
        Добавить область
      </Button>
    </Box>
  );
};

export default BalanceWheel;