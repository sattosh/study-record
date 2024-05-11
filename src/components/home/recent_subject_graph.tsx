import React from 'react';
import { DateTime } from 'luxon';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { AnyDictionary } from '../../models';
import { Box, Typography, useTheme } from '@mui/material';
import { SignalCellularAlt } from '@mui/icons-material';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

export type RecentGraphProps = {
  xDataKey: string;
  yDataKey: string;
  data: AnyDictionary[];
  dateTimeKey: string;
  dateTimeFormat?: string;
  beforeViewDate?: number;
};

export const RecentSubjectGraph = ({
  xDataKey,
  yDataKey,
  data,
  dateTimeKey,
  beforeViewDate = 8,
  dateTimeFormat = 'yyyy-MM-dd HH:mm',
}: RecentGraphProps) => {
  const theme = useTheme();

  const graphData = React.useMemo(() => {
    const limitTime = DateTime.now().minus({ days: beforeViewDate }).startOf('day').toMillis();
    const summrizedData = data.reduce((acc, cur) => {
      const currentDate = DateTime.fromFormat(cur[dateTimeKey] as string, dateTimeFormat).startOf('day');
      if (currentDate.toMillis() >= limitTime) {
        const key = cur[xDataKey];
        if (acc[key] === undefined) {
          acc[key] = {
            [xDataKey]: key,
            [yDataKey]: cur[yDataKey] || 0,
          };
        } else {
          acc[key][yDataKey] = (acc[key][yDataKey] as number) + (cur[yDataKey] as number);
        }
      }
      return acc;
    }, {} as Record<string, { [key in string]: string | number }>);

    return Object.values(summrizedData);
  }, [beforeViewDate, data, dateTimeKey, dateTimeFormat, xDataKey, yDataKey]);

  return (
    <>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <SignalCellularAlt sx={{ fontSize: theme.typography.h5.fontSize?.toString(), mr: 1 }} />
        <Typography variant="h5">直近の学習傾向</Typography>
      </Box>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} padding={{ left: 10, right: 10 }} />
          <YAxis unit="分" domain={[0, (dataMax: number) => (dataMax >= 100 ? dataMax : 100)]} />
          <Tooltip formatter={(v) => [`${v}分`, '学習時間']} />
          <Bar dataKey={yDataKey} barSize={50}>
            {graphData.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
