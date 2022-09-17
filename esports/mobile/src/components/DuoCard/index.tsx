import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  UseVoiceChannel: boolean;
  hourEnd: string;
  hourStart: string;
  name: string;
  weekDays: string[];
  yearsPLaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo label="Tempo de jogo" value={`${data.yearsPLaying} anos`} />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio"
        value={data.UseVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.UseVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }/>

        <TouchableOpacity 
          style={styles.button}
          onPress={onConnect}
          >
          <Text style={styles.buttonTitle}>
            Conectar
          </Text>
        </TouchableOpacity>
    </View>
  );
}
