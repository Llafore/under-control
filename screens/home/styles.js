import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  content: {
    width: '100%',
    paddingBottom: 24,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  appTitle: {
    color: '#E6EDF3',
    fontSize: 20,
    fontWeight: '800',
  },
  manageButton: {
    minWidth: 92,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC6C85',
  },
  pressed: {
    opacity: 0.68,
  },
  manageButtonText: {
    color: '#0D1117',
    fontSize: 14,
    fontWeight: '800',
  },
})
