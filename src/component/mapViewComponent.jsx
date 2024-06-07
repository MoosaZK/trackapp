import { memo } from "react";
import MapView from "react-native-maps";
import _ from 'lodash';

export const MapViewComponent = memo(
    (props) => {
      return (
        <MapView
          {...props}
        />
      );
    },
    (prevProps, nextProps) => {
      // Only re-render MapView if the region or pathCoordinates have changed
      if (
        prevProps.region.latitude !== nextProps.region.latitude ||
        prevProps.region.longitude !== nextProps.region.longitude ||
        prevProps.region.latitudeDelta !== nextProps.region.latitudeDelta ||
        prevProps.region.longitudeDelta !== nextProps.region.longitudeDelta ||
        !_.isEqual(prevProps.pathCoordinates, nextProps.pathCoordinates) // assuming you are using lodash in your project
      ) {
        return false;
      }
      return true;
    }
  );
  