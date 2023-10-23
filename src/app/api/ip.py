from getmac import get_mac_address


def obtain_mac_adress():
    mac_adress = get_mac_address()
    print(mac_adress)
    return mac_adress

mac = obtain_mac_adress()
