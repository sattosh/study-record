import React from 'react';
import { DateTime } from 'luxon';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { AnyDictionary } from '../../models';
import { Box, Typography, useTheme } from '@mui/material';
import { Timeline } from '@mui/icons-material';

export type RecentGraphProps = {
  xDataKey: string;
  yDataKey: string;
  data: AnyDictionary[];
  dateTimeFormat?: string;
  beforeViewDate?: number;
};

export const RecentTotalGraph = ({
  xDataKey,
  yDataKey,
  data,
  beforeViewDate = 8,
  dateTimeFormat = 'yyyy-MM-dd HH:mm',
}: RecentGraphProps) => {
  const theme = useTheme();

  const graphData = React.useMemo(() => {
    const limitTime = DateTime.now().minus({ days: beforeViewDate }).startOf('day').toMillis();
    const summrizedData = data.reduce((acc, cur) => {
      const currentDate = DateTime.fromFormat(cur[xDataKey] as string, dateTimeFormat).startOf('day');
      if (currentDate.toMillis() >= limitTime) {
        const key = currentDate.toFormat('yyyy-MM-dd');
        if (acc[key] === undefined) {
          acc[key] = {
            [xDataKey]: currentDate.toFormat('MM/dd'),
            [yDataKey]: cur[yDataKey] || 0,
          };
        } else {
          acc[key][yDataKey] = (acc[key][yDataKey] as number) + (cur[yDataKey] as number);
        }
      }
      return acc;
    }, {} as Record<string, { [key in string]: string | number }>);

    const viewDatetime = Array(beforeViewDate)
      .fill(0)
      .map((_, i) =>
        DateTime.now()
          .startOf('day')
          .minus({ days: beforeViewDate - 1 - i })
          .toFormat('yyyy-MM-dd')
      );

    return viewDatetime.map(
      (date) => summrizedData[date] || { [xDataKey]: DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('MM/dd'), [yDataKey]: 0 }
    );
  }, [beforeViewDate, data, xDataKey, dateTimeFormat, yDataKey]);

  return (
    <>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Timeline sx={{ fontSize: theme.typography.h5.fontSize?.toString(), mr: 1 }} />
        <Typography variant="h5">直近の学習状況</Typography>
      </Box>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} padding={{ left: 10, right: 10 }} />
          <YAxis unit="分" domain={[0, (dataMax: number) => (dataMax >= 100 ? dataMax : 100)]} />
          <Tooltip formatter={(v) => [`${v}分`, '学習時間']} />
          <Line dataKey={yDataKey} stroke="#ff617b" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
