export const  sendNotification = (tradeData) => {
    import("openfin-notifications").then((notification) => {
      notification.create({
        title: `${tradeData.status} Order Submitted!`,
        indicator: {
          text: "Notification Alert",
          color: notification.IndicatorColor.GREEN,
          type: "success",
        },
        category: "Notifications",
        body: `Your ${tradeData.orderType} order for ${tradeData.volume} ${tradeData.currency} was placed successfully for ${tradeData.price}$`,
      });
    });
  };