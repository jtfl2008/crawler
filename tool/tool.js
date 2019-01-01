module.exports = {
    sleep(time = 0) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, time);
        })
    }    
}